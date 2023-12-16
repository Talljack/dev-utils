// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod menu;
mod tray;
// mod command;

use menu::build_menu;
// use tray::{build_tray_menu, handler_tray_menu};
// use command::read_markdown_file;
use tauri_plugin_dialog::DialogExt;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let context = tauri::generate_context!();
  tauri::Builder::default()
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_clipboard_manager::init())
    .plugin(tauri_plugin_fs::init())
    .setup(move |app| {
      let _ = build_menu(app);
      app.dialog().file().pick_file(|file_path| {
          // do something with the optional file path here
          // the file path is `None` if the user closed the dialog
          println!("File path: {:?}", file_path)
      });
      app.dialog().message("Tauri is Awesome!").show(|show| {
        println!("Dialog was {}.", if show { "shown" } else { "hidden" });
      });
      Ok(())
    })
    // .system_tray(build_tray_menu())
    // .on_system_tray_event(handler_tray_menu)
    .invoke_handler(tauri::generate_handler![greet])
    .run(context)
    .expect("error while running dev-utils app");
}