<h1 align="center">
    <a href="https://github.com/ODGodinho">
        <img
            src="https://raw.githubusercontent.com/ODGodinho/Stanley-TheTemplate/main/public/images/Stanley.jpg"
            alt="Stanley Imagem" width="500"
        />
    </a>
    <br />
    Stanley The Template For Typescript By Dragons Gamers
    <br />
</h1>

<h4 align="center">Template Stanley for Typescript projects and packages 📦!</h4>

<p align="center">

[![codecov](https://codecov.io/gh/ODGodinho/Stanley-TheTemplate-Typescript/branch/main/graph/badge.svg?token=HNBNLLPZ3J)](https://codecov.io/gh/ODGodinho/Stanley-TheTemplate-Typescript)
[![Stargazers](https://img.shields.io/github/stars/ODGodinho/Stanley-TheTemplate-Typescript?color=F430A4)](https://github.com/ODGodinho/Stanley-TheTemplate-Typescript/stargazers)
[![Made by ODGodinho](https://img.shields.io/badge/made%20by-ODGodinho-%2304A361)](https://www.linkedin.com/in/victor-alves-odgodinho/)
[![Forks](https://img.shields.io/github/forks/ODGodinho/Stanley-TheTemplate-Typescript?color=CD4D34)](https://github.com/ODGodinho/Stanley-TheTemplate-Typescript/network/members)
![Repository size](https://img.shields.io/github/repo-size/ODGodinho/Stanley-TheTemplate-Typescript)
[![GitHub last commit](https://img.shields.io/github/last-commit/ODGodinho/Stanley-TheTemplate-Typescript)](https://github.com/ODGodinho/Stanley-TheTemplate-Typescript/commits/main)
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](https://opensource.org/licenses/MIT)
[![StyleCI](https://github.styleci.io/repos/562306382/shield?branch=main)](https://github.styleci.io/repos/562306382?branch=main)

</p>

# Table of Contents

- [🎇 Benefits](#-benefits)
- [📗 Libraries](#-libraries)
- [📁 Dependencies](#-dependencies)
- [⏩ Get Started](#-get-started)
  - [🔘 Use Template](#-use-template)
  - [🔑 Configure Github Secrets](#-configure-github-secrets)
    - [🙈 Create Github Token](#-create-github-token)
    - [🍀 Code Coverage](#-code-coverage)
    - [📦 Create NPM Token](#-create-npm-token)
    - [🔐 Create project Environment](#-create-project-environment)
  - [💻 Prepare to develop](#-prepare-to-develop)
  - [📍 Start Project](#-start-project)
  - [📨 Build and Run](#-build-and-run)
  - [🧪 Test Code](#-test-code)

---

## 🎇 Benefits

- 🚀 Speed start new project or package using typescript
- 🚨 Over 800 rules for pattern, possible errors and errors in Linter
- 🎇 Code quality guaranteed
- 📢 AutoReview when opening a pull-request/merge
    ![AutoReview Comment example](https://user-images.githubusercontent.com/3797062/97085944-87233a80-165b-11eb-94a8-0a47d5e24905.png)
- 🧪 Automatic Test when opening pull-request/merge
- 📈 Automatic Code Coverage when opening pull-request/merge
    ![Code Coverage example](https://app.codecov.io/static/media/codecov-report.eeef5dba5ea18b5ed6a4.png)
- 📦 Automatic Package and release generate on merge
- 🪝 Run Lint/Test command pre-commit execute

## 📗 Libraries

- [Node.js 26](https://nodejs.org/?n=dragonsgamers)
- [Typescript](https://www.typescriptlang.org/?n=dragonsgamers)
- [Eslint](https://eslint.org/?n=dragonsgamers)
- [ODG-Linter-JS](https://github.com/ODGodinho/ODG-Linter-Js?n=dragonsgamers)
- [EditorConfig](https://editorconfig.org/?n=dragonsgamers)
- [ReviewDog](https://github.com/reviewdog/action-eslint)

## 📁 Dependencies

- [Bun](https://bun.com) 1.4 or later
- [ODG TsConfig](https://github.com/ODGodinho/tsconfig) Last Version

## ⏩ Get Started

---

### 🔘 Use Template

Click in use this template button and clone your template project

![Use Template](https://raw.githubusercontent.com/ODGodinho/Stanley-TheTemplate/main/public/images/UseTemplate.png)

### 🔑 Configure Github Secrets

#### 🙈 Create Github Token

Before create new GITHUB_TOKEN in

- <https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token>

#### 🍀 Code Coverage

Add Code Coverage support in your project

1. Install CodeCov in your account <https://github.com/apps/codecov>
2. Enter In <https://app.codecov.io/gh/+> and search your repository
3. Click `setup repo`
4. Copy CODECOV_TOKEN and create a secret called CODECOV_TOKEN

#### 📦 Create NPM Token

if you want to generate packages create a secret called IS_PACKAGE = true AND create new NPM_TOKEN in

- <https://docs.npmjs.com/creating-and-viewing-access-tokens>

#### 🔐 Create project Environment

- On GitHub.com, navigate to the main page of the repository.
- Under your repository name, click `⚙️ Settings`.
![Github Setting images example](https://docs.github.com/assets/cb-27528/images/help/repository/repo-actions-settings.png)
- In the "Security" section of the sidebar, select `✳️ Secrets`, then click Actions.
- Click New repository secret.
- Type a name with: **GH_TOKEN**
- Enter with your access secret token `ghp_Dsfde....`
- Click Add secret.
- If you are going to publish package:
  - secrets:
    - create **NPM_TOKEN** = `npm_szxw......`
    - create **CODECOV_TOKEN** = `00000000-0000-0000-0000-000000000000`
  - variables:
    - create **IS_PACKAGE** = `true`

### 💻 Prepare To Develop

Copy `.env.example` to `.env` and add the values according to your needs.

### 📍 Start Project

First install dependencies with the following command

```bash
bun install
```

## 📨 Build and Run

To build the project, you can use the following command

> if you change files, you need to run `bun run build` and `bun run start` again

```bash
bun run build && bun run start
# or
bun run dev
```

## 🧪 Test Code

To Test execute this command

```bash
bun run test
# or
bun run test:watch
```
