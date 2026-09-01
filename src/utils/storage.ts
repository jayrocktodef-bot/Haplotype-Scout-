import { get, set, del, keys } from 'idb-keyval';
import { DnaAnalysisResult } from '../types/haplogroup';

const STORAGE_PREFIX = 'hs_kit_';

export async function saveAnalysisResult(result: DnaAnalysisResult): Promise<void> {
  await set(`${STORAGE_PREFIX}${result.id}`, result);
}

export async function getAllSavedKits(): Promise<DnaAnalysisResult[]> {
  try {
    const allKeys = await keys();
    const kitKeys = allKeys.filter(k => typeof k === 'string' && k.startsWith(STORAGE_PREFIX));
    const results: DnaAnalysisResult[] = [];
    
    for (const key of kitKeys) {
      const kit = await get<DnaAnalysisResult>(key);
      if (kit) results.push(kit);
    }
    
    return results.sort((a, b) => b.timestamp - a.timestamp);
  } catch (e) {
    console.error('Failed to load saved kits from IndexedDB:', e);
    return [];
  }
}

export async function deleteSavedKit(id: string): Promise<void> {
  await del(`${STORAGE_PREFIX}${id}`);
}

export async function forceClearCacheAndReload(): Promise<void> {
  try {
    // 1. Unregister all service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
    }

    // 2. Clear Cache Storage
    if ('caches' in window) {
      const cacheKeys = await caches.keys();
      for (const key of cacheKeys) {
        await caches.delete(key);
      }
    }

    // 3. Clear LocalStorage and SessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // 4. Force reload with timestamp
    const separator = window.location.href.includes('?') ? '&' : '?';
    window.location.href = `${window.location.origin}${window.location.pathname}${separator}v_flush=${Date.now()}`;
  } catch (err) {
    console.error('Error during forced cache clear:', err);
    window.location.reload();
  }
}
