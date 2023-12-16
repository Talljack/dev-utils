use tauri_plugin_dialog::DialogExt;

#[tauri::command]
pub fn read_markdown_file() -> Result<String, String> {
    // let path = dialog::open(None, None, None, None).await;
    let file_path = dialog().file().blocking_pick_file();

    match file_path {
        Ok(Some(path)) => std::fs::read_to_string(path).map_err(|e| e.to_string()),
        Ok(None) => Err("No file selected".into()),
        Err(e) => Err(e.to_string()),
    }
}