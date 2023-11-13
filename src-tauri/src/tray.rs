use tauri::{SystemTray, SystemTrayEvent, AppHandle, Manager};
pub fn build_tray_menu() -> SystemTray {
  #[cfg(target_os = "macos")]
  use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem};
  {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let tray_menu = SystemTrayMenu::new()
      .add_item(hide)
      .add_native_item(SystemTrayMenuItem::Separator)
      .add_item(quit);
    SystemTray::new().with_menu(tray_menu)
  }
  #[cfg(not(target_os = "macos"))]
  {
    SystemTray::new()
  }
}

pub fn handler_tray_menu(app: &AppHandle, event: SystemTrayEvent) {
   // 获取应用窗口
  let window = app.get_window("main");
  match window {
      Some(window) => {
        match event {
          SystemTrayEvent::LeftClick {
            tray_id: _,
            size: _,
            position: _,
            ..
          } => {
            let _ = window.set_focus();
          },
          SystemTrayEvent::MenuItemClick { id, .. } => {
            match id.as_str() {
                "quit" => {
                  std::process::exit(0);
                },
                "hide" => {
                  window.hide().unwrap();
                },
                _ => {}
            }
          }
          _ => {}
        }
      },
      None => {}
  }
}