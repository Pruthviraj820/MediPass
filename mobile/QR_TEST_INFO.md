# QR Code Testing Information

## Patient Email for Testing
Use this email to test QR code scanning:
```
john.doe@email.com
```

## How to Test
1. **Real QR Code**: Generate a QR code containing `john.doe@email.com`
2. **Mock Testing**: Use the "Test with Patient Email" button in the app
3. **Console Logs**: Check the console for debugging information

## Expected Behavior
- Camera should open and show scanning interface
- QR code should be detected and processed
- Patient information should be displayed after successful scan
- Mock patient: John Doe, O+ blood group, +1 555-0123

## Debugging
- Check console logs for scanner initialization
- Verify camera permissions are granted
- Ensure expo-barcode-scanner is properly installed
