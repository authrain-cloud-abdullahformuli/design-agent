import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

console.log('🧪 Running Design Agent repository sanity test suite...\n');

// 1. Required files
const requiredFiles = [
  'README.md',
  'LICENSE',
  'MAINTAINERS.md',
  'CITATION.cff',
  'package.json',
  'pyproject.toml',
  'agent.py',
  'install.sh',
  'OPERATIONS.md',
  'SECURITY.md',
  'NOTICE.md'
];

for (const file of requiredFiles) {
  assert.ok(fs.existsSync(file), `Expected ${file} to exist`);
  const content = fs.readFileSync(file, 'utf8');
  assert.ok(content.length > 0, `Expected ${file} not to be empty`);
  console.log(`✓ File verified: ${file}`);
}

// 2. Forbidden files
const forbiddenFiles = ['CONTRIBUTING.md', 'CODE_OF_CONDUCT.md'];
for (const file of forbiddenFiles) {
  assert.ok(!fs.existsSync(file), `Forbidden file found: ${file}`);
  console.log(`✓ Confirmed absent: ${file}`);
}

// 3. Sole maintainer policy
const maintainers = fs.readFileSync('MAINTAINERS.md', 'utf8');
assert.ok(maintainers.includes('Abdullah Formuli'), 'MAINTAINERS.md must specify Abdullah Formuli');
assert.ok(maintainers.includes('authrainmedia@gmail.com'), 'MAINTAINERS.md must specify email');
assert.ok(maintainers.includes('External contributions or third-party pull requests are not accepted'), 'MAINTAINERS.md must enforce sole maintainer policy');

const readme = fs.readFileSync('README.md', 'utf8');
assert.ok(readme.includes('maintained solely by [Abdullah Formuli]'), 'README.md must declare sole maintainer');
assert.ok(readme.includes('External contributions or third-party pull requests are not accepted'), 'README.md must declare no contributions accepted');
console.log('✓ Confirmed: Sole maintainer policy enforced');

// 4. License verification
const license = fs.readFileSync('LICENSE', 'utf8');
assert.ok(license.includes('Copyright 2026 Abdullah Formuli'), 'LICENSE must attribute Abdullah Formuli');
console.log('✓ Confirmed: LICENSE attributed to Abdullah Formuli');

// 5. Citation verification
const citation = fs.readFileSync('CITATION.cff', 'utf8');
assert.ok(citation.includes('family-names: Formuli'), 'CITATION.cff must list Formuli');
assert.ok(citation.includes('given-names: Abdullah'), 'CITATION.cff must list Abdullah');
assert.ok(citation.includes('authrain-cloud-abdullahformuli/design-agent'), 'CITATION.cff must list repo');
console.log('✓ Confirmed: CITATION.cff verified');

// 6. Package.json verification
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
assert.strictEqual(pkg.name, 'design-agent');
assert.ok(pkg.author.includes('Abdullah Formuli'), 'package.json author must be Abdullah Formuli');
assert.ok(pkg.repository.url.includes('authrain-cloud-abdullahformuli/design-agent'), 'package.json repo URL must be updated');
console.log('✓ Confirmed: package.json verified');

// 7. Pyproject.toml verification
const pyproject = fs.readFileSync('pyproject.toml', 'utf8');
assert.ok(pyproject.includes('Abdullah Formuli'), 'pyproject.toml must list Abdullah Formuli');
assert.ok(pyproject.includes('authrain-cloud-abdullahformuli/design-agent'), 'pyproject.toml must point to Abdullah repo');
console.log('✓ Confirmed: pyproject.toml verified');

// 8. Demo video presence
const launchMp4 = '/Users/authrain/Downloads/design-agent-launch.mp4';
const explainerMp4 = '/Users/authrain/Downloads/design-agent-explainer.mp4';
assert.ok(fs.existsSync(launchMp4), 'Expected launch video in Downloads');
assert.ok(fs.existsSync(explainerMp4), 'Expected explainer video in Downloads');
assert.ok(readme.includes('ee5b98e0-7ec6-4b24-ada6-1f27087947a3'), 'README must embed launch video');
assert.ok(readme.includes('65eac8e4-0fac-4a5a-9cca-02e26a0a8baa'), 'README must embed explainer video');
console.log('✓ Confirmed: Demo videos saved in Downloads and embedded in README.md');

// 9. Zero upstream repo links remaining
assert.ok(!readme.includes('langchain-ai/design-agent'), 'README must not link to upstream repo');
console.log('✓ Confirmed: Zero langchain-ai/design-agent links in README.md');

console.log('\n🎉 All Design Agent sanity tests passed successfully!');
