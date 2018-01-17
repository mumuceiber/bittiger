import docker
import os
import shutil
import uuid

from docker.errors import APIError
from docker.errors import ContainerError
from docker.errors import ImageNotFound

#get the reletive path for currrent file
CURRENT_DIR = os.path.dirname(os.path.relpath(__file__))
IMAGE_NAME = 'mumuceiber/ojc'
client = docker.from_env()

TEMP_BUILD_DIR = "%s/tmp/" % CURRENT_DIR
CONTAINER_NAME = "%s:latest" % IMAGE_NAME

SOURCE_FILE_NAMES = {
    "java": "Solution.java",
    "python": "example.py"
}
BINARY_NAMES = {
    "java": "Solution",
    "python": "example.py"
}
BUILD_COMMANDS = {
    "java": "javac",
    "python": "python"
}
RUN_COMMANDS = {
    "java": "java",
    "python": "python"
}

def load_image():
    try:
        client.images.get(IMAGE_NAME) #first try to find image from local
        print "Image exists locally"
    except ImageNotFound: # cannot found locally, try to pull from docker hub
        print "Image not found locally: Loading from docker hub"
        client.images.pull(IMAGE_NAME)
    except APIError:
        print "docker hub error"
        return
    print "image loaded"

def make_dir(dir):
    try:
        os.mkdir(dir)
    except OSError:
        print "make directory fail"

def build_and_run_results(code, lang):
    result = {"build": None, "run":None}
    source_file_parent_dir_name = uuid.uuid4()
    # host_dir is the directory in local system
    source_file_host_dir = "%s/%s" % (TEMP_BUILD_DIR, source_file_parent_dir_name)
    # the dir in docker associated with source_file_host_dir
    source_file_guest_dir = "/text/%s" % (source_file_parent_dir_name)
    make_dir(source_file_host_dir)

    with open("%s/%s" % (source_file_host_dir, SOURCE_FILE_NAMES[lang]), 'w') as source_file: source_file.write(code)

    try:
        client.containers.run(
            image=IMAGE_NAME,
            command="%s %s" % (BUILD_COMMANDS[lang], SOURCE_FILE_NAMES[lang]),
            volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
            working_dir=source_file_guest_dir
        )
        print "source build succeed"
        result['build'] = 'OK'
    except ContainerError as e: # build fail
        result['build'] = str(e.stderr).encode("utf-8")
        shutil.rmtree(source_file_host_dir) #delete created local folder
        return result

    try:
        log = client.containers.run(
            image=IMAGE_NAME,
            command="%s %s" % (RUN_COMMANDS[lang], BINARY_NAMES[lang]),
            volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
            working_dir=source_file_guest_dir
        )
        log = str(log).encode("utf-8")
        print "run succeed"
        result['run'] = log;
    except ContainerError as e:
        result['run'] = str(e.stderr, 'utf-8')
        shutil.rmtree(source_file_host_dir)
        return result
    shutil.rmtree(source_file_host_dir)
    return result
