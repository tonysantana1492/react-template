const { renderHook } = require('@testing-library/react-hooks');
const { useDisclosure } = require('hooks/useDisclosure');

test('useDisclosure', async () => {
	const { result } = renderHook(() => useDisclosure());

	expect(result.current.isOpen).toBe(false);

	// await result.current.open();
// 
	// expect(result.current.isOpen).toBe(true);
});
