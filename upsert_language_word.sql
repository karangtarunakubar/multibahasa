-- Add a new regional word, or update its translation if that word already exists.
-- Run language_words.sql first to create the table.
-- Bind values for :language_code, :language_name, :word, and :translation.
INSERT INTO language_words (language_code, language_name, word, translation)
VALUES (:language_code, :language_name, :word, :translation)
ON CONFLICT (language_code, word) DO UPDATE SET
    language_name = excluded.language_name,
    translation = excluded.translation;
