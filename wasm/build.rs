use chrono::Utc;
use std::process::Command;

fn main() {
    let output = Command::new("git")
        .args(&["rev-parse", "--short", "HEAD"])
        .output()
        .unwrap();

    let git_hash = String::from_utf8(output.stdout).unwrap();

    println!("cargo:rustc-env=CARGO_GIT_HASH={}", git_hash);

    println!(
        "cargo:rustc-env=CARGO_BUILD_TIME={}",
        Utc::now().to_rfc2822()
    );
}
