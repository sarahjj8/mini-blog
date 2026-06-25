import fs from "fs";
import path from "path";

const VALID_APPROVED = ["0", "1", "true", "false"];

function normalizeString(value) {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

function normalizeObject(obj) {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      result[key] = value.map(item =>
        typeof item === "object" && item !== null
          ? normalizeObject(item)
          : normalizeString(item)
      );
    }
    else if (typeof value === "object" && value !== null) {
      result[key] = normalizeObject(value);
    }
    else {
      result[key] = normalizeString(value);
    }
  }

  return result;
}

function normalizeNumber(value) {
    if (value === undefined || value === null) return undefined;
    const num = Number(value);
    return Number.isNaN(num) ? undefined : num;
}

function normalizeBoolean(value) {
    if (value === undefined || value === null) return 0;
    else if (value === true || value === false) return value;
    else if (value === "true" || value === "1") return 1;
    else if (value === "false" || value === "0") return 0;
    else throw new Error("approved must be true, false, 0 or 1");
}

function normalizeApproved(value) {
    value = normalizeString(value);
    if (value === undefined || value === null) return undefined;
    else if (VALID_APPROVED.includes(value)) return value;
    else throw new Error(`approved must be one of: ${VALID_APPROVED.join(", ")}`);
}

function normalizeEmail(value) {
    value = normalizeString(value);

    if (!value) {
        throw new Error("mail is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
        throw new Error("invalid email address");
    }

    return value.toLowerCase();
}

export function validateCreatePost(body = {}) {
    body = normalizeObject(body);
    const title = normalizeString(body.title);
    if (!title) {
        throw new Error("title is required");
    }

    const description = normalizeString(body.description);
    if (!description) {
        throw new Error("description is required");
    }
    
    // const image = normalizeImage(body.image);
    const image = body.image;
    const category_id = body.category_id;

    return {
        title,
        description,
        image, 
        category_id
    };
}

export function validateCreateCategory(body = {}) {
    body = normalizeObject(body);
    const name = normalizeString(body.name);
    if (!name) {
        throw new Error("name is required");
    }

    return {
        name
    };
}

export function validateCreateComment(body = {}) {
    body = normalizeObject(body);
    const mail = normalizeEmail(body.mail);

    const description = normalizeString(body.description);
    if (!description) {
        throw new Error("description is required");
    }
    
    const post_id = body.post_id;
    const approved = normalizeBoolean(body.approved);

    return {
        mail,
        post_id,
        description,
        approved
    };
}

function encodeID(s) {
    if (s==='') return '';
    return s.replace(/[^a-zA-Z0-9.-]/g, function(match) {
    return ''+match[0].charCodeAt(0).toString(16)+'_';
    });
}

export function validateId(id) {
    if (id === undefined){
      return undefined;
    }
    id = encodeID(id);
    const num = Number(id);

    if (!Number.isInteger(num) || num <= 0) {
        throw new Error("id must be a positive integer");
    }

    return num;
}