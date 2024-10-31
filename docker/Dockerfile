FROM ubuntu:20.04

ENV XRES=1280x800x24
ENV TZ=Etc/UTC
ENV DEBIAN_FRONTEND=noninteractive
ENV DISPLAY=:1

# Install dependencies
RUN apt-get update -q \
  && apt-get upgrade -qy \
  && apt-get install -qy --no-install-recommends \
  apt-utils sudo supervisor vim \
  xserver-xorg xvfb x11vnc dbus-x11 \
  xfce4 xfce4-terminal xfce4-xkb-plugin \
  locales wget curl ca-certificates \
  fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 \
  libatspi2.0-0 libcups2 libdbus-1-3 libdrm2 libgbm1 libgtk-3-0 \
  libnspr4 libnss3 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 \
  libxshmfence1 xdg-utils \
  libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils \
  && echo "LC_ALL=en_US.UTF-8" >> /etc/environment \
  && echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen \
  && echo "LANG=en_US.UTF-8" > /etc/locale.conf \
  && locale-gen en_US.UTF-8

# Install Google Chrome
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
  && apt-get install -y ./google-chrome-stable_current_amd64.deb \
  && rm google-chrome-stable_current_amd64.deb

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs

# Set up user
RUN useradd -m ubuntu -s /bin/bash \
  && echo "ubuntu:ubuntu" | chpasswd \
  && echo "ubuntu ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Set up configuration files
ADD docker/etc /etc
ADD docker/config/xfce4/terminal/terminalrc /home/ubuntu/.config/xfce4/terminal/terminalrc
ADD docker/config/xfce4/xfconf/xfce-perchannel-xml/xfce4-desktop.xml /home/ubuntu/.config/xfce4/xfconf/xfce-perchannel-xml/xfce4-desktop.xml
ADD docker/config/xfce4/xfconf/xfce-perchannel-xml/xsettings.xml /home/ubuntu/.config/xfce4/xfconf/xfce-perchannel-xml/xsettings.xml

# Set up bashrc
RUN echo 'export TZ=/usr/share/zoneinfo/$TZ' >> /home/ubuntu/.bashrc \
  && sed -i 's/#alias/alias/' /home/ubuntu/.bashrc \
  && echo "alias lla='ls -al'" >> /home/ubuntu/.bashrc \
  && echo "alias llt='ls -ltr'" >> /home/ubuntu/.bashrc \
  && echo "alias llta='ls -altr'" >> /home/ubuntu/.bashrc \
  && echo "alias llh='ls -lh'" >> /home/ubuntu/.bashrc \
  && echo "alias lld='ls -l|grep ^d'" >> /home/ubuntu/.bashrc \
  && echo "alias hh=history" >> /home/ubuntu/.bashrc \
  && echo "alias hhg='history|grep -i" '"$@"' "'" >> /home/ubuntu/.bashrc

# Create Google Chrome configuration directory and set ownership
RUN mkdir -p /home/ubuntu/.config/google-chrome && \
  chown -R ubuntu:ubuntu /home/ubuntu

WORKDIR /home/ubuntu/app
COPY package*.json ./
RUN npm install
COPY . .

# Expose port 5900 for VNC
EXPOSE 5900

CMD /usr/bin/supervisord -c /etc/supervisord.conf & npm run start
