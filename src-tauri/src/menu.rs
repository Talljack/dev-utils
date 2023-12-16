use tauri::menu::{MenuBuilder, CheckMenuItemBuilder, MenuItemBuilder};
use tauri::App;

pub fn build_menu<>(app: &mut App) -> Result<(), Box<dyn std::error::Error>>{
  let app_name = &app.package_info().name;
  println!("app_name: {}", app_name);
  let toggle = MenuItemBuilder::with_id("toggle", "Toggle").build(app);
  let check = CheckMenuItemBuilder::new("Mark").build(app);
  let menu = MenuBuilder::new(app).items(&[&toggle, &check]).build()?;

  app.set_menu(menu)?;

  app.on_menu_event(move |_app, event| {
      if event.id() == check.id() {
          println!("`check` triggered, do something! is checked? {}", check.is_checked().unwrap());
      } else if event.id() == "toggle" {
          println!("toggle triggered!");
      }
  });
  Ok(())
}

// pub fn build_menu<R: Runtime<EventLoopMessage>>(context: &Context<EmbeddedAssets>) -> Menu<R> {
//   // get the app name from the tauri.conf.json package
//   let app_name = &context.package_info().name;
//   println!("app_name: {}", app_name);
//   #[cfg(target_os = "macos")]
//   {
//     use tauri::menu::Submenu;
//     // 应用主菜单
//     let app_menu = Submenu::new("app", Menu::new("").add_native_item(MenuItem::About(app_name.into(), AboutMetadata::new()))
//        .add_native_item(MenuItem::Separator)
//        .add_native_item(MenuItem::Services)
//        .add_native_item(MenuItem::Separator)
//        .add_native_item(MenuItem::Hide)
//        .add_native_item(MenuItem::HideOthers)
//        .add_native_item(MenuItem::ShowAll)
//        .add_native_item(MenuItem::Separator)
//        .add_native_item(MenuItem::Quit), false);
//     let operation_menu = Submenu::new(
// "Edit",
// Menu::new("")
//       .add_native_item(MenuItem::Undo)
//       .add_native_item(MenuItem::Redo)
//       .add_native_item(MenuItem::Separator)
//       .add_native_item(MenuItem::Cut)
//       .add_native_item(MenuItem::Copy)
//       .add_native_item(MenuItem::Paste)
//       .add_native_item(MenuItem::Separator)
//       .add_native_item(MenuItem::SelectAll),
//       false
//     );
//     // let custom_menu = Submenu::new(
//     //   "Custom",
//     //   Menu::new("")
//     //     .add_item(CustomMenuItem::new("custom-id".to_string(), "Custom"))
//     // );
//     Menu::new()
//       .add_submenu(app_menu)
//       .add_submenu(operation_menu)
//   }
//   #[cfg(not(target_os = "macos"))]
//   {
//     Menu::new()
//   }

// }



// pub fn handler_menu(event: WindowMenuEvent) {
//   let window = Some(event.window());
//   match event.menu_item_id() {
//       "custom-id" => {
//           message(window, "Custom menu item clicked!", "Custom menu item clicked!");
//       },
//       _ => {
//         println!("other")
//       }
//   }
// }
