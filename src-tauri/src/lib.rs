mod menu;
use tauri::App;
#[cfg(mobile)]
mod mobile;
#[cfg(mobile)]
pub use mobile::*;
use menu::build_menu;
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

pub type SetupHook = Box<dyn FnOnce(&mut App) -> Result<(), Box<dyn std::error::Error>> + Send>;

#[derive(Default)]
pub struct AppBuilder {
  setup: Option<SetupHook>,
}
impl AppBuilder {
  pub fn new() -> Self {
    Self::default()
  }

  #[must_use]
  pub fn setup<F>(mut self, setup: F) -> Self
  where
    F: FnOnce(&mut App) -> Result<(), Box<dyn std::error::Error>> + Send + 'static,
  {
    self.setup.replace(Box::new(setup));
    self
  }
  pub fn run(self) {
    let setup = self.setup;
    let context = tauri::generate_context!();
    tauri::Builder::default()
      .enable_macos_default_menu(false)
      .plugin(tauri_plugin_shell::init())
      .plugin(tauri_plugin_dialog::init())
      .plugin(tauri_plugin_clipboard_manager::init())
      .plugin(tauri_plugin_fs::init())
      .setup(move |app| {
        if let Some(setup) = setup {
          (setup)(app)?;
        }
        Ok(())
      })
      // .menu(|handle| Ok(build_menu(handle).expect("failed to build menu")))
      .menu(|app| {
        Ok(build_menu(app).expect("failed to set up menu"))
      })
      .invoke_handler(tauri::generate_handler![greet])
      .run(context)
      .expect("error while running dev-utils app");
  }
}