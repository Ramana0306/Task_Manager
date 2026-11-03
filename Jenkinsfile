
pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose -p task-manager-ci-cd2 build'
            }
        }

        stage('Deploy Application') {
            steps {
                sh 'docker compose -p task-manager-ci-cd2 up -d --remove-orphans'
            }
        }
    }

    post {
        success {
            echo 'Application deployed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
