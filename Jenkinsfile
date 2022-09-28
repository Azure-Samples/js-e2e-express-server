pipeline{
    agent {label 'NODE-JS-NPM'}
    parameters{
        choice(name: 'CHOOSE_BRANCH', choices: ['main','New_REL1.0'], description: 'Branch to build') 
    }
    triggers{
        pollSCM('* * * * *')
    }
    stages{
        stage('vcs'){
            steps{
                git url:'https://github.com/ziyad-ansari/js-e2e-express-server-mine.git',
                branch:"${params.CHOOSE_BRANCH}"
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