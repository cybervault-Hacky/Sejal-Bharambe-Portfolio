/**
 * Credentials type definitions
 * Education, certifications and achievements - all CV-supported
 */

export interface Education {
  /** Degree name - e.g. "Bachelor of Engineering" */
  degree: string;
  /** Field of study - e.g. "Electronics & Telecommunication" */
  field: string;
  /** Institution name */
  institution: string;
  /** Location - city, country */
  location?: string;
  /** Year or year range */
  year: string;
  /** Score / percentage as stated in the CV */
  score?: string;
}

export interface Certification {
  /** Certification title */
  title: string;
  /** Issuing organization */
  issuer: string;
  /** Year */
  year: string;
}

export interface Achievement {
  /** Achievement description */
  title: string;
  /** Year */
  year: string;
}
