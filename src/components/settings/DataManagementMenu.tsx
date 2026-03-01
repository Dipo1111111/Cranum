import { Download, Copy, Upload } from 'lucide-react';

export function DataManagementMenu() {
    return (
        <div className="space-y-4">
            <div className="card-elevated">
                <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">Data Management</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Export your data to transfer it to another device, or import a backup.
                </p>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => {
                                const data = {
                                    habits: localStorage.getItem('atomicxp_habits'),
                                    history: localStorage.getItem('atomicxp_history'),
                                    character: localStorage.getItem('atomicxp_character_v2')
                                };
                                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `atomicxp-backup-${new Date().toISOString().split('T')[0]}.json`;
                                a.click();
                            }}
                            className="btn-secondary flex items-center justify-center gap-2 py-3"
                        >
                            <Download size={18} />
                            Export File
                        </button>

                        <button
                            onClick={() => {
                                const data = {
                                    habits: localStorage.getItem('atomicxp_habits'),
                                    history: localStorage.getItem('atomicxp_history'),
                                    character: localStorage.getItem('atomicxp_character_v2')
                                };
                                navigator.clipboard.writeText(JSON.stringify(data));
                                alert('Data copied to clipboard!');
                            }}
                            className="btn-secondary flex items-center justify-center gap-2 py-3"
                        >
                            <Copy size={18} />
                            Copy Data
                        </button>
                    </div>

                    <div className="pt-2 border-t border-border">
                        <h4 className="text-sm font-medium text-foreground mb-2">Import Data</h4>
                        <textarea
                            className="input-field min-h-[100px] mb-2 font-mono text-xs"
                            placeholder="Paste your backup JSON here..."
                            id="import-area"
                        />
                        <button
                            onClick={() => {
                                try {
                                    const input = (document.getElementById('import-area') as HTMLTextAreaElement).value;
                                    if (!input) return;

                                    const data = JSON.parse(input);

                                    if (data.habits) localStorage.setItem('atomicxp_habits', data.habits);
                                    if (data.history) localStorage.setItem('atomicxp_history', data.history);
                                    if (data.character) localStorage.setItem('atomicxp_character_v2', data.character);

                                    alert('Data imported successfully! The app will now reload.');
                                    window.location.reload();
                                } catch (e) {
                                    alert('Invalid data format. Please check your backup string.');
                                    console.error(e);
                                }
                            }}
                            className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                            <Upload size={18} />
                            Import Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
