# This pins the packages to certain versions
with import (builtins.fetchTarball {
  # Descriptive name to make the store path easier to identify
  name = "nixos-unstable-19.03";
  # Commit hash for nixos-unstable as of 19.03
  url = https://github.com/NixOS/nixpkgs/archive/19.03.tar.gz;
  # Hash obtained using `nix-prefetch-url --unpack <url>`
  sha256 = "0q2m2qhyga9yq29yz90ywgjbn9hdahs7i8wwlq7b55rdbyiwa5dy";
}) {};

stdenv.mkDerivation rec {
  name = "env";
  env = buildEnv { name = name; paths = buildInputs; };
  buildInputs = [
    nodejs-10_x
  ];
}
