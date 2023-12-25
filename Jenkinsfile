pipeline 
{ 

    agent any

    triggers {
        pollSCM('* * * * *')
    }

    stages {

        stage('Source checkout') 
        {
            steps {
                echo 'Cloning source code is finished.'
            }
        }

        stage('Test') {
            steps {
                echo 'Cloning source test is finished.'
            }
        }

        stage('Docker build') {
            steps {
                echo 'Build dokcer image'
                sh ''' docker image build -t foodie-inc-frontend .'''
            }
        }

        stage('Docker deploy') {
            steps {
                echo '----------------- This is a docker deploment phase ----------'
                sh '''
                (if  [ $(docker ps -a | grep foodie-inc-frontend-container | cut -d " " -f1) ]; then \
                        echo $(docker rm -f foodie-inc-frontend-container); \
                        echo "---------------- successfully removed foodie-inc-frontend-container ----------------"
                     else \
                    echo OK; \
                 fi;);
                docker container run --network foodie-inc-network --restart always --name foodie-inc-frontend-container -p 4000:80 -d foodie-inc-frontend
            '''
            }
        }
    }
}