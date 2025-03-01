# MarketHub

MarketHub is a marketplace for buying and selling anything you want. It's a community-driven platform that connects buyers and sellers, allowing them to easily find each other and complete transactions.

## Installation

1. Clone the repository
2. Copy the `.env.example` file to `.env`
3. Update the environment variables in the `.env` file
4. Build/Run `docker compose down`
`docker compose up -d --build`
`docker-compose up -d`
5. Open your browser and navigate to `http://localhost:8000`

## Resetting Docker Desktop on Debian

This guide provides step-by-step instructions to reset Docker Desktop on Debian by clearing its configurations and data.
### Steps to Reset Docker Desktop

#### 1. Quit Docker Desktop
Stop Docker Desktop and terminate any running processes:
```sh
  systemctl --user stop docker-desktop
  pkill Docker
```

#### 2. Remove Docker Desktop Configurations
```sh
  rm -rf ~/.docker ~/.config/Docker ~/.local/share/docker
```

#### 3. Clear Docker Socket & Data (If Needed)
```sh
  sudo rm -rf /var/lib/docker /etc/docker
```

#### 4. Restart Docker Desktop
```sh
  systemctl --user start docker-desktop
```


## Contributing

Contributions are welcome! Please follow the guidelinecles outlined in the [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
