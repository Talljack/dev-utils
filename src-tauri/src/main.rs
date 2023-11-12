// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod menu;

use menu::build_menu;

fn main() {
  let context = tauri::generate_context!();
  tauri::Builder::default()
    .menu(build_menu(&context))
    .run(context)
    .expect("error while running dev-utils app");
}
