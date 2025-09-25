// Test script to verify frontend functionality
console.log('Testing LenoDigital frontend...')

// Test if React is loaded
if (typeof React !== 'undefined') {
  console.log('✅ React is loaded')
} else {
  console.log('❌ React is not loaded')
}

// Test if Next.js is loaded
if (typeof window !== 'undefined' && window.__NEXT_DATA__) {
  console.log('✅ Next.js is loaded')
} else {
  console.log('❌ Next.js is not loaded')
}

// Test if fetch is available
if (typeof fetch !== 'undefined') {
  console.log('✅ Fetch API is available')
} else {
  console.log('❌ Fetch API is not available')
}

// Test form submission
document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ DOM is loaded')
  
  // Check if signup form exists
  const signupForm = document.querySelector('form')
  if (signupForm) {
    console.log('✅ Signup form found')
    
    // Test form submission
    signupForm.addEventListener('submit', function(e) {
      console.log('✅ Form submission event triggered')
    })
  } else {
    console.log('❌ Signup form not found')
  }
})

console.log('Frontend test completed')
