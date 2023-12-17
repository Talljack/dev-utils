use tauri::menu::{Menu, MenuItem, PredefinedMenuItem, Submenu, MenuEvent};
use tauri::{AppHandle, Manager};
use tauri_runtime_wry::Wry;
use tauri::EventLoopMessage;
pub fn build_menu(handle: &AppHandle) -> Result<Menu<Wry<EventLoopMessage>>, tauri::Error> {
  // let handle = app.handle();
  // get the app name from the tauri.conf.json package
  let app_name = match handle.config().package.product_name.clone() {
      Some(name) => name,
      None => "Dev Utils".to_string(),
  };
  #[cfg(target_os = "macos")]
  {
    // 应用主菜单
    let app_menu = &Submenu::with_items(
      handle,
      "app",
      true,
      &[
        &PredefinedMenuItem::about(handle, Some(&app_name), None),
        &PredefinedMenuItem::separator(handle),
        &PredefinedMenuItem::services(handle, Some("Services")),
        &PredefinedMenuItem::separator(handle),
        &PredefinedMenuItem::hide(handle, Some("Hide")),
        &PredefinedMenuItem::hide_others(handle, Some("Hide Others")),
        &PredefinedMenuItem::separator(handle),
        &PredefinedMenuItem::quit(handle, Some("Quit")),
      ],
    )?;
    let operation_menu = &Submenu::with_items(
      handle,
      "Edit",
      true,
      &[
        &PredefinedMenuItem::undo(handle, Some("Undo")),
        &PredefinedMenuItem::redo(handle, Some("Redo")),
        &PredefinedMenuItem::separator(handle),
        &PredefinedMenuItem::cut(handle, Some("Cut")),
        &PredefinedMenuItem::copy(handle, Some("Copy")),
        &PredefinedMenuItem::paste(handle, Some("Paste")),
        &PredefinedMenuItem::separator(handle),
        &PredefinedMenuItem::select_all(handle, Some("Select All")),
      ],
    )?;
    let custom_menu = &Submenu::with_items(
      handle,
      "Custom",
      true,
      &[
        &MenuItem::new(handle, "Custom", true, None),
        &MenuItem::new(handle, "Text", true, None),
      ],
    )?;
    handle.on_menu_event(handler_menu);
    Ok(Menu::with_items(handle, &[
      app_menu,
      operation_menu,
      custom_menu,
    ])?)
  }
  #[cfg(not(target_os = "macos"))]
  {
    Menu::with_items(app, &[])
  }

}



pub fn handler_menu(app: &AppHandle, event: MenuEvent) {
  // let window = Some(event.window());
  let window = app.get_window("main").unwrap();
  match event.id() {
    id => {
      match id.0.as_str() {
        "21" => {
          window.emit("custom", "custom").unwrap();
        },
        _ => {}
      }
    }
  }
}
