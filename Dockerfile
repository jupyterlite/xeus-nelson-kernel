FROM --platform=linux/amd64 mambaorg/micromamba:0.23.1 as build

ARG MAMBA_DOCKERFILE_ACTIVATE=1
ARG PYTHON_VERSION=3.10

RUN micromamba install --yes -c conda-forge \
    git pip python=$PYTHON_VERSION click typer \
    "empack>=2.0.2"

##################################################################
# Create emscripten env and pack it
##################################################################

RUN micromamba create -n xeus-nelson-kernel \
    --platform=emscripten-32 \
    --root-prefix=/tmp/xeus-nelson-kernel \
    -c https://repo.mamba.pm/emscripten-forge \
    -c https://repo.mamba.pm/conda-forge \
    --yes \
    xeus-nelson xeus-lite

RUN mkdir -p xeus-nelson-kernel && cd xeus-nelson-kernel && \
    cp /tmp/xeus-nelson-kernel/envs/xeus-nelson-kernel/bin/xnelson_wasm.js . && \
    cp /tmp/xeus-nelson-kernel/envs/xeus-nelson-kernel/bin/xnelson_wasm.wasm . && \
    empack pack env --env-prefix /tmp/xeus-nelson-kernel/envs/xeus-nelson-kernel --outname nelson_data

COPY copy_output.sh .

ENTRYPOINT ["/bin/bash"]
