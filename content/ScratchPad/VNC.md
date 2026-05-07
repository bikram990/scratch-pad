---
title: "VNC"
description: "Commands to setup a vnc server"
tags: ["vnc"]
weight: 1
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
---

## x11vnc

- Install `xfce4` display manager and `x11vnc` vnc app

  ```sh
  sudo apt install xfce4 xfce4-goodies x11vnc
  ```

- Choose `lightdm` for display manager. It can be changed using `sudo dpkg-reconfigure lightdm`
- Reboot to apply the changes

  ```sh
  sudo reboot
  ```

- Setup `x11vnc` to start automatically on boot. Create a file `/lib/systemd/system/x11vnc.service` with the following content:

  ```sh
  echo "[Unit]
  Description=x11vnc service
  After=display-manager.service network.target syslog.target

  [Service]
  Type=simple
  ExecStart=/usr/bin/x11vnc -forever -display :0 -auth guess -passwd <password>
  ExecStop=/usr/bin/killall x11vnc
  Restart=on-failure

  [Install]
  WantedBy=multi-user.target" > /lib/systemd/system/x11vnc.service
  ```

- Reload and enable the service:

  ```sh
  sudo systemctl daemon-reload
  sudo systemctl enable x11vnc.service
  sudo systemctl start x11vnc.service
  ```

- Now you can connect to the machine on `5900` port using vncviewer or `vnc://<ip>:5900` in mac.

## Tiger VNC

```sh
sudo apt install tigervnc-standalone-server tigervnc-xorg-extension tigervnc-viewer dbus-x11 tasksel
```

```sh
echo "#!/bin/sh
# Start Gnome 3 Desktop
[ -x /etc/vnc/xstartup ] && exec /etc/vnc/xstartup
[ -r $HOME/.Xresources ] && xrdb $HOME/.Xresources
vncconfig -iconic &
dbus-launch --exit-with-session gnome-session" > ~/.vnc/xstartup
```

- Setup `tigervnc` to start automatically on boot. Create a file `/lib/systemd/system/x11vnc.service` with the following content:

    ```sh

  echo '[Unit]
  Description=Start TigerVNC server at startup
  After=syslog.target network.target

[Service]
Type=forking
User=amanpk
Group=amanpk
WorkingDirectory=/home/amanpk

PIDFile=/home/amanpk/.vnc/%H:%i.pid
ExecStartPre=-/usr/bin/vncserver -kill :%i > /dev/null 2>&1
ExecStart=/usr/bin/tigervncserver -xstartup /usr/bin/gnome-session -localhost :%i
ExecStop=/usr/bin/vncserver -kill :%i

[Install]
WantedBy=multi-user.target' > /etc/systemd/system/vncserver@.service
    ```

```sh
#!/bin/sh

#unset SESSION_MANAGER
#unset DBUS_SESSION_BUS_ADDRESS

[ -x /etc/vnc/xstartup ] && exec /etc/vnc/xstartup
[ -r $HOME/.Xresources ] && xrdb $HOME/.Xresources

dbus-launch --exit-with-session gnome-session-classic
```
