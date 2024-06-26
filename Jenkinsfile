import groovy.transform.Field

@Field
def qualityGateStatus = null

pipeline {
  agent any
  environment {
    IMAGE_NAME = 'opleiding-harbor.bcverdouw.nl/wc/umpire_quiz_frontend'
    REPO_NAME = env.GIT_URL.replace('.git', '').split('/').last()
    VERSION = getNextSemanticVersion minorPattern: '^[Ff]eat.*', patchPattern: '^[Ff]ix'
    MAJOR_VERSION = VERSION.getMajor()
    MINOR_VERSION = VERSION.getMinor()
    PREV_VERSION = getHighestSemanticVersion().toString()
    SONAR_BREAKS_BUILD = false
    SONAR_PROJECT_KEY = 'Umpire-Quiz-Frontend'
    SONAR_PROJECT_NAME = 'Umpire Quiz Frontend'
  }
  tools {
    nodejs 'Node20.12'
  }
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npx ng test --watch=false --code-coverage'
      }
      post {
        always {
          junit 'TESTS-*.xml'
        }
      }
    }

    stage('SonarQube Analysis') {
      when {
        branch 'main'
      }
      steps {
        script {
          withSonarQubeEnv(credentialsId: 'Sonar-Secret') {
            sh "npx sonarqube-scanner \
                    -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                    -Dsonar.projectName='${SONAR_PROJECT_NAME}' \
                    -Dsonar.projectVersion='${VERSION}'"
          }
        }
        waitForQualityGate abortPipeline: SONAR_BREAKS_BUILD, credentialsId: 'Sonar-Secret'
      }
    }

    stage('Docker push') {
      when {
        allOf {
          not { equals(actual: "${VERSION}", expected: "${PREV_VERSION}") }
          branch 'main'
        }
      }
      steps {
        sh 'podman build -t ${IMAGE_NAME} .'
        sh 'podman tag ${IMAGE_NAME}:latest ${IMAGE_NAME}:${VERSION}'
        sh 'podman tag ${IMAGE_NAME}:latest ${IMAGE_NAME}:${MAJOR_VERSION}-latest'
        sh 'podman tag ${IMAGE_NAME}:latest ${IMAGE_NAME}:${MAJOR_VERSION}.${MINOR_VERSION}-latest'
        withCredentials([usernamePassword(credentialsId: 'Harbor_Robot', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
          sh 'podman push --creds $USERNAME:$PASSWORD ${IMAGE_NAME}:latest'
          sh 'podman push --creds $USERNAME:$PASSWORD ${IMAGE_NAME}:${VERSION}'
          sh 'podman push --creds $USERNAME:$PASSWORD ${IMAGE_NAME}:${MAJOR_VERSION}-latest'
          sh 'podman push --creds $USERNAME:$PASSWORD ${IMAGE_NAME}:${MAJOR_VERSION}.${MINOR_VERSION}-latest'
        }
        sh 'podman image rm ${IMAGE_NAME}:latest \
                            ${IMAGE_NAME}:${VERSION} \
                            ${IMAGE_NAME}:${MAJOR_VERSION}-latest \
                            ${IMAGE_NAME}:${MAJOR_VERSION}.${MINOR_VERSION}-latest'
      }
    }

    stage('Github release') {
      when {
        allOf {
          not { equals(actual: "${VERSION}", expected: "${PREV_VERSION}") }
          branch 'main'
        }
      }
      steps {
        script {
          id = release()
        }
      }
    }

    stage('Update Gebruikers Test Omgeving') {
      when {
        allOf {
          not { equals(actual: "${VERSION}", expected: "${PREV_VERSION}") }
          branch 'main'
        }
      }
      steps {
        withCredentials([sshUserPrivateKey(credentialsId: 'Umpire-Quiz-Acceptatie', keyFileVariable: 'KEY', usernameVariable: 'USER')]) {
          sh 'ssh -i $KEY $USER@192.168.178.240 ~/update-Quiz.sh'
        }
      }
    }
  }

  post {
    cleanup {
      cleanWs()
    }
  }
}
