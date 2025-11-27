/**
 * Animation Components Usage Guide
 * 
 * This file demonstrates how to use the viewport-triggered animation components.
 * Copy these patterns into your pages for consistent, performant animations.
 */

import ScrollFadeInUp from "./ScrollFadeInUp";
import SlideInLeft from "./SlideInLeft";
import SlideInRight from "./SlideInRight";
import BlurReveal from "./BlurReveal";
import StaggerChildren from "./StaggerChildren";

// Example 1: Simple fade-in-up on scroll
export function FadeInUpExample() {
  return (
    <ScrollFadeInUp className="mb-8">
      <h2 className="text-4xl font-light text-gray-900">
        This heading fades in from below
      </h2>
    </ScrollFadeInUp>
  );
}

// Example 2: Slide in from left
export function SlideInLeftExample() {
  return (
    <SlideInLeft className="mb-8">
      <div className="bg-white p-8 rounded-lg shadow">
        <p className="text-gray-700">This slides in from the left</p>
      </div>
    </SlideInLeft>
  );
}

// Example 3: Slide in from right
export function SlideInRightExample() {
  return (
    <SlideInRight className="mb-8">
      <div className="bg-white p-8 rounded-lg shadow">
        <p className="text-gray-700">This slides in from the right</p>
      </div>
    </SlideInRight>
  );
}

// Example 4: Blur reveal effect
export function BlurRevealExample() {
  return (
    <BlurReveal className="mb-8">
      <img src="/placeholder.svg" alt="Blur reveal example" className="rounded-lg shadow" />
    </BlurReveal>
  );
}

// Example 5: Staggered children (cards in a grid)
export function StaggeredGridExample() {
  return (
    <StaggerChildren
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      animationType="fade-in-up"
      staggerDelay={150}
    >
      <div data-stagger-child className="opacity-0 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Card 1</h3>
        <p className="text-gray-600">This card appears first with a stagger</p>
      </div>
      <div data-stagger-child className="opacity-0 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Card 2</h3>
        <p className="text-gray-600">This card appears second with delay</p>
      </div>
      <div data-stagger-child className="opacity-0 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Card 3</h3>
        <p className="text-gray-600">This card appears third with longer delay</p>
      </div>
    </StaggerChildren>
  );
}

// Example 6: Staggered list items
export function StaggeredListExample() {
  return (
    <StaggerChildren
      className="space-y-4"
      animationType="slide-in-left"
      staggerDelay={120}
    >
      <li data-stagger-child className="opacity-0 flex items-start gap-3">
        <span className="text-primary font-bold">✓</span>
        <span>First benefit animates in</span>
      </li>
      <li data-stagger-child className="opacity-0 flex items-start gap-3">
        <span className="text-primary font-bold">✓</span>
        <span>Second benefit follows with delay</span>
      </li>
      <li data-stagger-child className="opacity-0 flex items-start gap-3">
        <span className="text-primary font-bold">✓</span>
        <span>Third benefit completes the sequence</span>
      </li>
    </StaggerChildren>
  );
}

export default {
  FadeInUpExample,
  SlideInLeftExample,
  SlideInRightExample,
  BlurRevealExample,
  StaggeredGridExample,
  StaggeredListExample,
};
