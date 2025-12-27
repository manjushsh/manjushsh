// Portfolio Data Constants

const WORK_TYPE_LABELS = [
  "Stability & Reliability",
  "Feature Leadership",
  "Core Engineering",
  "DevOps & Maintenance",
  "Security Engineering",
  "Architecture & Strategy",
  "Performance & Scaling",
];

// Corresponds to label order
const WORK_TYPE_VALUES = [71, 46, 42, 32, 26, 7, 2];

const DOMAIN_LABELS = [
  "Full Stack / Frontend",
  "Backend Services",
  "Data & Pipeline",
  "Security & Ops",
];

const DOMAIN_VALUES = [113, 18, 5, 14];

const SUMMARY_DATA = {
  "Stability & Reliability": {
    total: 71,
    systems: {
      "Content Discovery Engine": 37,
      "Competitive Intelligence Pipeline": 13,
      "SaaS Visualization Tool": 8,
    },
  },
  "Core Engineering": {
    total: 42,
    systems: {
      "Content Discovery Engine": 36,
      "Competitive Intelligence Pipeline": 3,
      "Frontend Design System": 2,
    },
  },
  "Feature Leadership": {
    total: 46,
    systems: {
      "Competitive Intelligence Pipeline": 26,
      "Content Discovery Engine": 12,
      "Gamification Microservice": 3,
    },
  },
  "Security Engineering": {
    total: 26,
    systems: {
      "SaaS Visualization Tool": 26,
    },
  },
  "DevOps & Maintenance": {
    total: 32,
    systems: {
      "Competitive Intelligence Pipeline": 13,
      "Content Discovery Engine": 13,
      "Core Backend Services": 4,
    },
  },
  "Architecture & Strategy": {
    total: 7,
    systems: {
      "Content Discovery Engine": 5,
      "Competitive Intelligence Pipeline": 1,
      "Core Backend Services": 1,
    },
  },
  "Performance & Scaling": {
    total: 2,
    systems: {
      "Core Backend Services": 1,
      "Content Discovery Engine": 1,
    },
  },
  "Data & Pipeline": {
    total: 5,
    systems: {
      "ETL Data Platform": 5,
    },
  },
  "Full Stack & Frontend": {
    total: 113,
    systems: {
      "Content Discovery Engine": 113,
    },
  },
  "Backend Services": {
    total: 18,
    systems: {
      "Core Backend Services": 18,
    },
  },
  "Security & Ops": {
    total: 14,
    systems: {
      "SaaS Visualization Tool": 14,
    },
  },
};
