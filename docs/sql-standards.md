# SQL Standards and Best Practices

This document outlines the SQL standards and best practices for the Healthify Digital Hub project, particularly for Supabase migrations.

## SQL Style Guide

### Naming Conventions

1. **Tables**: Use snake_case and plural names
   - Good: `patients`, `health_records`
   - Bad: `Patient`, `health_record`

2. **Columns**: Use snake_case
   - Good: `first_name`, `date_of_birth`
   - Bad: `FirstName`, `DateOfBirth`

3. **Primary Keys**: Use `id` as the name
   - Good: `id UUID PRIMARY KEY`
   - Bad: `patient_id UUID PRIMARY KEY`

4. **Foreign Keys**: Use the singular table name followed by `_id`
   - Good: `patient_id`, `doctor_id`
   - Bad: `patientID`, `doctor`

5. **Indexes**: Name should describe the purpose and columns
   - Good: `idx_patients_user_id`, `idx_appointments_date`
   - Bad: `index1`, `patient_index`

6. **Policies**: Use descriptive names that explain the access pattern
   - Good: `Patients can view own records`
   - Bad: `patient_policy`

### SQL Formatting

1. **Keywords**: Use UPPERCASE for SQL keywords
   - Good: `SELECT * FROM patients WHERE id = 'x';`
   - Bad: `select * from patients where id = 'x';`

2. **Indentation**: Use 2 or 4 spaces for indentation (be consistent)
   ```sql
   SELECT
     first_name,
     last_name,
     email
   FROM
     patients
   WHERE
     active = true;
   ```

3. **Line Breaks**: Place each column on a new line in SELECT statements
   with many columns

4. **Comments**: Use `--` for single-line comments and `/* */` for multi-line
   ```sql
   -- This is a single line comment
   
   /* 
   This is a 
   multi-line comment
   */
   ```

## Database Schema Best Practices

1. **Always use UUIDs** for primary keys
   ```sql
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
   ```

2. **Include timestamps** on all tables
   ```sql
   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   ```

3. **Use proper constraints** for data integrity
   ```sql
   email TEXT NOT NULL UNIQUE,
   age INTEGER CHECK (age >= 0)
   ```

4. **Create indexes** for frequently queried columns
   ```sql
   CREATE INDEX idx_patients_email ON patients(email);
   ```

5. **Use foreign key constraints** to maintain referential integrity
   ```sql
   doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE
   ```

6. **Keep tables normalized** to avoid data duplication

## Migration-Specific Rules

1. **Make migrations idempotent**
   - Use `IF EXISTS` / `IF NOT EXISTS` in DDL statements
   - Check before executing statements that could fail if run twice

2. **One logical change per migration**
   - Focus each migration on a specific, cohesive change
   - Avoid mixing unrelated schema changes in a single migration

3. **Include comments** explaining the purpose of the migration
   ```sql
   -- This migration adds the ability to track patient insurance information
   ```

4. **Include rollback logic** (commented out) at the end of each migration
   ```sql
   -- Rollback:
   -- DROP TABLE IF EXISTS patient_insurance;
   ```

5. **Use transactions** for complex migrations
   ```sql
   BEGIN;
   -- Migration statements here
   COMMIT;
   ```

## Row Level Security (RLS)

1. **Always enable RLS** on every table
   ```sql
   ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
   ```

2. **Define policies** for each operation type (SELECT, INSERT, UPDATE, DELETE)
   ```sql
   CREATE POLICY "policy_name" ON table_name
       FOR SELECT
       USING (condition);
   ```

3. **Test policies** thoroughly before deploying

4. **Use helper functions** for complex policy logic
   ```sql
   CREATE OR REPLACE FUNCTION check_user_can_access_patient(patient_id UUID)
   RETURNS BOOLEAN AS $$
   BEGIN
     RETURN EXISTS (
       -- Logic here
     );
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;
   ```

## Validation Rules

Our CI/CD pipeline automatically checks for the following:

1. **Missing idempotence checks**
   - All `CREATE TABLE` statements should use `IF NOT EXISTS`
   - All `CREATE INDEX` statements should use `IF NOT EXISTS`
   - All `CREATE POLICY` statements should use `IF NOT EXISTS` when appropriate

2. **Missing RLS**
   - All tables should have `ENABLE ROW LEVEL SECURITY`

3. **SQL syntax and formatting issues** using SQLFluff

## Performance Considerations

1. **Limit the size of migrations** to avoid long-running operations

2. **Create indexes** for columns used in WHERE, JOIN, or ORDER BY clauses
   ```sql
   CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
   ```

3. **Add appropriate indexes** for foreign keys
   ```sql
   CREATE INDEX idx_health_records_patient_id ON health_records(patient_id);
   ```

4. **Use efficient query patterns** in RLS policies

5. **Avoid table scans** in policies when possible

## Common Pitfalls

1. **Creating tables without RLS**: Always enable RLS on tables with sensitive data

2. **Forgetting idempotence checks**: Use `IF EXISTS`/`IF NOT EXISTS` to ensure migrations can be run multiple times

3. **Overly permissive policies**: Define the narrowest possible access pattern

4. **Missing indexes**: Add indexes for frequently queried columns

5. **Not testing policies**: Always test RLS policies with different user roles 