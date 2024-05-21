FROM rust:1.77-buster

WORKDIR /app

COPY Cargo.toml Cargo.lock /app/

# Installe les dépendances
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo fetch
RUN cargo build --release
RUN rm src/main.rs

COPY . /app/

RUN cargo build --release

EXPOSE 8000

# Commande pour lancer l'application
CMD ["/app/target/release/yatdl-back"]