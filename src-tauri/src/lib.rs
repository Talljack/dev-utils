// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod menu;
// mod tray;
// mod command;
// use tauri::menu::{Menu, MenuItem, PredefinedMenuItem, Submenu};
use menu::build_menu;
// use tray::{build_tray_menu, handler_tray_menu};
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let context = tauri::generate_context!();
  tauri::Builder::default()
    .enable_macos_default_menu(false)
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_clipboard_manager::init())
    .plugin(tauri_plugin_fs::init())
    // .menu(|handle| Ok(build_menu(handle).expect("failed to build menu")))
    .menu(|app| {
      Ok(build_menu(app).expect("failed to set up menu"))
    })
    // .system_tray(build_tray_menu())
    // .on_system_tray_event(handler_tray_menu)
    .invoke_handler(tauri::generate_handler![greet])
    .run(context)
    .expect("error while running dev-utils app");
}