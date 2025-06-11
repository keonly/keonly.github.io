{
  description = "keonly.github.io";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs = {
    self,
    nixpkgs,
    flake-parts,
    ...
  } @ inputs: let
    inherit (nixpkgs) lib;
    systems = lib.systems.flakeExposed;
  in
    flake-parts.lib.mkFlake {inherit inputs;} {
      inherit systems;

      perSystem = {pkgs, ...}: let
        nodejs = pkgs.nodejs_22;
        site = pkgs.buildNpmPackage {
          inherit nodejs;

          pname = "quartz";
          version = "4.5.1";
          src = ./.;

          npmInstallFlags = ["--include=dev"];
          npmBuild = "npm run build";
          npmDepsHash = "sha256-1/oGhKIAB0ke/5i+czHo7iu0QDnsCve2zlF4ivlL2nQ=";
          installPhase = ''
            mkdir -p $out
            cp -R public/* $out/
          '';
        };

        serveScript = pkgs.writeShellScriptBin "serve-quartz" ''
          set -euo pipefail
          exec ${pkgs.nodejs_22}/bin/npx --yes quartz build --serve --watch
        '';
      in {
        formatter = pkgs.alejandra;

        devShells.default = pkgs.mkShellNoCC {
          packages = [
            nodejs
            pkgs.nodePackages.pnpm
          ];

          shellHook = ''
            export PS1="(blog) $PS1"
            echo "→ Run 'pnpm install' (or 'npm ci') in ./quartz if you update deps."
          '';
        };

        packages.site = site;
        apps.serve = {
          type = "app";
          program = "${serveScript}/bin/serve-quartz";
        };
      };
    };
}
