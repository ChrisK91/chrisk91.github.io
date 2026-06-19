---
title: Compile ESPHome remotely on Hetzner using Docker and Tailscale
comments: true
date: 2026-06-19
outline: false
tags:
- Home Assistant
summary: The new ESPHome can now send your code to a remote device. This way you can use a beefier machine to compile your projects, which can save quite a bit of time!
---

**Warning** Exposing ESPHome will allow connected devices to run commands remotely. In this setup, ESPHome is exposed to a Tailscale Network only. When changing your configuration you should always use safe passwords and make sure to not expose your service accidentally!

You can find the code also on GitHub at https://github.com/ChrisK91/docker-esphome-tailscale

## Prerequisites

- You need a Server with Docker running. I'm running a small IPv6-only server on Hetzner. Running an IPv6-Only server requires additional configuration steps
    - *IPv6:* Configure docker to use IPv6 networks by editing/creating your `/etc/docker/daemon.json`-file
        {{<code lang="json" filename="/etc/docker/daemon.json">}}{
  "ipv6": true,
  "fixed-cidr-v6": "fd00::/80",
  "experimental": true,
  "ip6tables": true
}
{{</code>}}
- Install the [Tailscale](https://github.com/hassio-addons/app-tailscale/) add-on to homeassistant
    - You can disable the Exit Node if you don't want to route internet through your homeassistant device
    - You **must** disable `Userspace networking mode` or ESPHome will be unable to reach your tailscale devices
    - After starting the add-on check the log to authenticate the new device

## Docker Setup

You can download or manually create the required files. When running an IPv6-only server it might be easier to upload them manually as long as GitHub is still IPv4 only. Otherwise you can run `curl https://raw.githubusercontent.com/ChrisK91/docker-esphome-tailscale/refs/heads/main/.env > .env` and `curl https://raw.githubusercontent.com/ChrisK91/docker-esphome-tailscale/refs/heads/main/compose.yml > compose.yml` to download the files.

Get a Auth-Key from the [Tailscale admin panel](https://login.tailscale.com/admin/settings/keys) and add it to your `.env ` file.

On Hetzner IPv6-only you need to uncomment the IPv6 related entries in the `compose.yml` which results in the final file as follows:

{{<code lang="yml" filename="compose.yml">}}
services:
  tailscale:
    image: tailscale/tailscale:latest
    container_name: tailscale
    hostname: tailscale-esphome
    environment:
      - TS_AUTHKEY=${AUTHKEY}
      - TS_STATE_DIR=/var/lib/tailscale
      - TS_EXTRA_ARGS=--accept-routes # accept routes for remote networks
    volumes:
      - ./tailscale-state:/var/lib/tailscale
    cap_add:
      - net_admin
      - net_raw
    networks:
      - ipv6_net # connect to ipv6 network, server is ipv6 only
    restart: unless-stopped
    dns:
      - 2a01:4f8:c2c:123f::1  # Hetzner NAT64 resolver
  esphome:
    container_name: esphome
    image: esphome/esphome
    volumes:
      - ./esphome/config:/config
      - /etc/localtime:/etc/localtime:ro
    restart: unless-stopped
    network_mode: service:tailscale
    depends_on:
      -  tailscale
    privileged: true
    environment:
      - ESPHOME_USERNAME=${ESPHOME_USERNAME}
      - ESPHOME_PASSWORD=${ESPHOME_PASSWORD}

networks:
  ipv6_net:
    enable_ipv6: true
{{</code>}}

Finally start your container with `docker compose up -d` and verify that the `tailscale-esphome` and `homeassistant` device are connected in your [Tailscale dashboard](https://login.tailscale.com/admin/machines). **Note down your ip from the dashboard!**

## Configuring ESPHome

Connect to your remote device either via the IP noted above or via http://tailscale-esphome:6052 and head to Settings. Go to `Pairing Requests`. Leave the screen open.

On your Home Assistant ESPHome dashboard head to `Settings` -> `Send builds` and click `Pair with a build server`. Enter the Tailscale IP from above. You will see a request popping up on the remote dashboard (at http://tailscale-esphome:6052). Compare the emojis and pair the device.

That's it. After pairing, builds can be sent to the remote server. Happy building!