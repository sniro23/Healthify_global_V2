import type { Meta, StoryObj } from '@storybook/react';
import { AccessibilitySettings } from './AccessibilitySettings';
import { AccessibilityProvider } from '../providers/AccessibilityProvider';

const meta: Meta<typeof AccessibilitySettings> = {
  title: 'Settings/AccessibilitySettings',
  component: AccessibilitySettings,
  decorators: [
    (Story) => (
      <AccessibilityProvider>
        <div className="max-w-2xl mx-auto p-4">
          <Story />
        </div>
      </AccessibilityProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AccessibilitySettings>;

export const Default: Story = {
  args: {},
};

export const WithHighContrast: Story = {
  decorators: [
    (Story) => (
      <AccessibilityProvider>
        <div className="max-w-2xl mx-auto p-4">
          <div className="high-contrast">
            <Story />
          </div>
        </div>
      </AccessibilityProvider>
    ),
  ],
};

export const WithLargeFont: Story = {
  decorators: [
    (Story) => (
      <AccessibilityProvider>
        <div className="max-w-2xl mx-auto p-4" style={{ fontSize: '18px' }}>
          <Story />
        </div>
      </AccessibilityProvider>
    ),
  ],
};

export const WithReducedMotion: Story = {
  decorators: [
    (Story) => (
      <AccessibilityProvider>
        <div className="max-w-2xl mx-auto p-4">
          <div className="reduced-motion">
            <Story />
          </div>
        </div>
      </AccessibilityProvider>
    ),
  ],
}; 