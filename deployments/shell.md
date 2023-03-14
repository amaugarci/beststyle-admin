sudo docker login  -u admin -p Fh7FSgEQ6hMn8MB7Q4URnh76eEDdIXAg https://docker.biyong001.com/

## api
docker rm -f bourse-api
sudo docker run -d --name bourse-api --network bourse --restart=always docker.biyong.com/bourse/bourse-api:1.0.0-7




