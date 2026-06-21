import trimesh
import numpy as np

# Create handle
handle = trimesh.creation.cylinder(radius=0.08, height=1.2)
handle.visual.face_colors = [100, 100, 100, 255]

# Create left weights
w1_l = trimesh.creation.cylinder(radius=0.4, height=0.15)
w1_l.apply_translation([0, 0, -0.5])
w1_l.visual.face_colors = [30, 30, 30, 255]

w2_l = trimesh.creation.cylinder(radius=0.3, height=0.1)
w2_l.apply_translation([0, 0, -0.65])
w2_l.visual.face_colors = [30, 30, 30, 255]

# Create right weights
w1_r = trimesh.creation.cylinder(radius=0.4, height=0.15)
w1_r.apply_translation([0, 0, 0.5])
w1_r.visual.face_colors = [30, 30, 30, 255]

w2_r = trimesh.creation.cylinder(radius=0.3, height=0.1)
w2_r.apply_translation([0, 0, 0.65])
w2_r.visual.face_colors = [30, 30, 30, 255]

# Combine
dumbbell = handle + w1_l + w2_l + w1_r + w2_r
# Rotate to stand up or lay flat nicely
dumbbell.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [1, 0, 0]))

# Export
dumbbell.export('public/dumbbell.glb')
print("GLB created successfully.")
