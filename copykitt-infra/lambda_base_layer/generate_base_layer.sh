# helper script to generate a base layer for lambda functions

# remove the container if it exists
docker rm layer-container

# build the base layer(image)
docker build -t base-layer .

# rename it to layer-container
docker run --name layer-container base-layer

# copy the generated zip artifact so my CDK can use it
docker cp layer-container:layer.zip . && echo "Created layer.zip with updated base layer."
