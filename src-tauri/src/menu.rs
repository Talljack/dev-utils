use tauri::{utils::assets::EmbeddedAssets, Context, Menu, Submenu, AboutMetadata, MenuItem, CustomMenuItem, WindowMenuEvent};
use tauri::api::dialog::message;

pub fn build_menu(context: &Context<EmbeddedAssets>) -> Menu {
  // get the app name from the tauri.conf.json package
  let app_name = &context.package_info().name;
  println!("app_name: {}", app_name);
  #[cfg(target_os = "macos")]
  {
    // 应用主菜单
    let app_menu = Submenu::new(
      "",
      // MenuItem::About 为原生菜单
      Menu::new().add_native_item(MenuItem::About(app_name.into(), AboutMetadata::new()))
      .add_native_item(MenuItem::Separator)
      .add_native_item(MenuItem::Services)
      .add_native_item(MenuItem::Separator)
      .add_native_item(MenuItem::Hide)
      .add_native_item(MenuItem::HideOthers)
      .add_native_item(MenuItem::ShowAll)
      .add_native_item(MenuItem::Separator)
      .add_native_item(MenuItem::Quit)
    );
    let operation_menu = Submenu::new(
"Edit",
Menu::new()
      .add_native_item(MenuItem::Undo)
      .add_native_item(MenuItem::Redo)
      .add_native_item(MenuItem::Separator)
      .add_native_item(MenuItem::Cut)
      .add_native_item(MenuItem::Copy)
      .add_native_item(MenuItem::Paste)
      .add_native_item(MenuItem::Separator)
      .add_native_item(MenuItem::SelectAll)
    );
    let custom_menu = Submenu::new(
      "Custom",
      Menu::new()
        .add_item(CustomMenuItem::new("custom-id".to_string(), "Custom"))
    );
    Menu::new()
      .add_submenu(app_menu)
      .add_submenu(operation_menu)
      .add_submenu(custom_menu)
  }
  #[cfg(not(target_os = "macos"))]
  {
    Menu::new()
  }

}



pub fn handler_menu(event: WindowMenuEvent) {
  let window = Some(event.window());
  match event.menu_item_id() {
      "custom-id" => {
          message(window, "Custom menu item clicked!", "Custom menu item clicked!");
      },
      _ => {
        println!("other")
      }
  }
}