// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod menu;
mod tray;

use menu::{build_menu, handler_menu};
use tray::{build_tray_menu, handler_tray_menu};


fn main() {
  let context = tauri::generate_context!();
  tauri::Builder::default()
    .menu(build_menu(&context))
    .on_menu_event(handler_menu)
    .system_tray(build_tray_menu())
    .on_system_tray_event(handler_tray_menu)
    .run(context)
    .expect("error while running dev-utils app");
}
