module.exports = {
  name: 'client',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/client',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
