pipeline {
    agent any

    stages {
        stage('Build & Dockerize Frontend') {
            steps {
                echo 'Building frontend application and creating Docker image...'
                sh 'docker build -t atakandockerdevops/arac_kiralama_frontend:latest .'
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing the Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'docker login -u $DOCKER_USER -p $DOCKER_PASS'
                    sh 'docker push atakandockerdevops/arac_kiralama_frontend:latest'
                }
            }
        }
    }
}