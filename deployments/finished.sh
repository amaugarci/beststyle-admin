#!/bin/bash

docker login  -u admin -p Fh7FSgEQ6hMn8MB7Q4URnh76eEDdIXAg https://docker.biyong001.com/

if [ "${EVN}" = "pre" ];then
    docker tag pre-learn-admin:${VERSION}-${BUILD_ID} docker.biyong001.com/pre/learn-admin:${VERSION}-${BUILD_ID}
    docker push docker.biyong001.com/pre/learn-admin:${VERSION}-${BUILD_ID}
else
    docker tag learn-admin:${VERSION}-${BUILD_ID} docker.biyong001.com/learn/learn-admin:${VERSION}-${BUILD_ID}
    docker push docker.biyong001.com/learn/learn-admin:${VERSION}-${BUILD_ID}
fi