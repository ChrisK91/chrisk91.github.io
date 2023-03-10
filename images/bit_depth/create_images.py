import numpy as np
import skimage
import skimage.io

save_path = r""

data = np.ndarray(shape = (50, 800), dtype = np.uint8)

for simulated_depth in range(2, 256, 1):
    step_size = 800 / simulated_depth

    for i in range(0, 800):
        value = (int(i/step_size) / (simulated_depth - 1)) * np.iinfo(np.uint8).max
        for j in range(0, 50):
            data[j, i] = value

    skimage.io.imsave(save_path + "\\bit{0:03d}.png".format(simulated_depth), data)