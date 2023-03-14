#!/bin/bash

docker login  -u admin -p Fh7FSgEQ6hMn8MB7Q4URnh76eEDdIXAg https://docker.biyong001.com/

if [ "${EVN}" = "pre" ];then
    docker tag pre-bourse-admin:${VERSION}-${BUILD_ID} docker.biyong001.com/pre/bourse-admin:${VERSION}-${BUILD_ID}
    docker push docker.biyong001.com/pre/bourse-admin:${VERSION}-${BUILD_ID}
else
    docker tag bourse-admin:${VERSION}-${BUILD_ID} docker.biyong001.com/bourse/bourse-admin:${VERSION}-${BUILD_ID}
    docker push docker.biyong001.com/bourse/bourse-admin:${VERSION}-${BUILD_ID}
fi