![Angular Badge](https://img.shields.io/badge/Angular-v21.0.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)

# Equipment Installation Check

## Live Deployment
Available on [https://imimoun.github.io/equipment-installation-check/](https://imimoun.github.io/equipment-installation-check/).

## Getting Started (Local Development)
### Prerequisites
- NodeJs v24.11.1
- Angular v21.0.0

### Run the project
```bash
ng serve
```
The server will be running on `http://localhost:4200/`.

## Update GitHub Pages
```bash
ng build --output-path docs --base-href /equipment-installation-check/
mv docs/browser/* docs/
```
