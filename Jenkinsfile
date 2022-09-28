pipeline{
    agent any
    stages{
        stage('vcs'){
            steps{
                git url:'https://github.com/ziyad-ansari/js-e2e-express-server-mine.git',
                branch:"New_REL1.0"
            }
        }
        stage('build'){
            steps{
                sh """export PATH="/home/ubuntu/.nvm/versions/node/v16.17.1/bin:$PATH"
                    npm install
                    npm run build"""
            }
        }
    }
}