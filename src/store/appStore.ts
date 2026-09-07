import { create } from 'zustand';
import { mockSensors, mockZones, mockAlerts } from '@/data/mockData';
import { Sensor, Zone, Alert, SystemState } from '@/types';

interface AppState {
  sensors: Sensor[];
  zones: Zone[];
  alerts: Alert[];
  isOnline: boolean;
  emergencyScenarioActive: boolean;
  demoMode: boolean;
  rainfall: number;
  waterLevel: number;
  soilMoisture: number;
  terrainChange: number;
  setSensors: (sensors: Sensor[]) => void;
  setZones: (zones: Zone[]) => void;
  setAlerts: (alerts: Alert[]) => void;
  setOnline: (isOnline: boolean) => void;
  setEmergencyScenario: (active: boolean) => void;
  updateEnvironmentalValues: (rainfall: number, waterLevel: number, soilMoisture: number, terrainChange: number) => void;
  runEmergencyScenario: () => void;
  resetScenario: () => void;
}

const initialRainfall = 86;
const initialWaterLevel = 78;
const initialSoilMoisture = 82;
const initialTerrainChange = 64;

export const useAppStore = create<AppState>((set) => ({
  sensors: mockSensors,
  zones: mockZones,
  alerts: mockAlerts,
  isOnline: true,
  emergencyScenarioActive: false,
  demoMode: true,
  rainfall: initialRainfall,
  waterLevel: initialWaterLevel,
  soilMoisture: initialSoilMoisture,
  terrainChange: initialTerrainChange,
  setSensors: (sensors) => set({ sensors }),
  setZones: (zones) => set({ zones }),
  setAlerts: (alerts) => set({ alerts }),
  setOnline: (isOnline) => set({ isOnline }),
  setEmergencyScenario: (active) => set({ emergencyScenarioActive: active }),
  updateEnvironmentalValues: (rainfall, waterLevel, soilMoisture, terrainChange) =>
    set({ rainfall, waterLevel, soilMoisture, terrainChange }),
  runEmergencyScenario: () => {
    set({ emergencyScenarioActive: true });
    const interval = setInterval(() => {
      set((state) => {
        if (!state.emergencyScenarioActive) {
          clearInterval(interval);
          return state;
        }
        const newRainfall = Math.min(state.rainfall + 5, 100);
        const newWaterLevel = Math.min(state.waterLevel + 4, 100);
        const newSoilMoisture = Math.min(state.soilMoisture + 3, 100);
        const newTerrainChange = Math.min(state.terrainChange + 2, 100);
        return {
          rainfall: newRainfall,
          waterLevel: newWaterLevel,
          soilMoisture: newSoilMoisture,
          terrainChange: newTerrainChange,
        };
      });
    }, 800);
  },
  resetScenario: () => {
    set({
      emergencyScenarioActive: false,
      rainfall: initialRainfall,
      waterLevel: initialWaterLevel,
      soilMoisture: initialSoilMoisture,
      terrainChange: initialTerrainChange,
    });
  },
}));
