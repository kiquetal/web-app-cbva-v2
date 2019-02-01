From mariadb:latest
WORKDIR /sql-files
ADD sql/ /sql-files

ENV MYSQL_ROOT_PASSWORD paraguay
ENV MYSQL_DATABASE ormdb
ENV MYSQL_USER user
ENV MYSQL_PASSWORD password

ADD sql/todump.sql /docker-entrypoint-initdb.d
EXPOSE 3306
CMD ["mysqld"]
