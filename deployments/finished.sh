#!/bin/bash

docker login  -u bourse -p bourseOcRqW9852 https://docker.flct.io/

if [ "${EVN}" = "pre" ];then
    docker tag pre-learn-admin:${VERSION}-${BUILD_ID} docker.flct.io/bourse/pre-learn-admin:${VERSION}-${BUILD_ID}
    docker push docker.flct.io/bourse/pre-learn-admin:${VERSION}-${BUILD_ID}
else
    docker tag learn-admin:${VERSION}-${BUILD_ID} docker.flct.io/bourse/learn-admin:${VERSION}-${BUILD_ID}
    docker push docker.flct.io/bourse/learn-admin:${VERSION}-${BUILD_ID}
fi