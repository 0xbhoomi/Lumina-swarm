// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Executor {
    event SwapExecuted(
        address indexed user,
        address indexed target,
        uint256 value,
        bytes data,
        bytes result,
        bytes32 requestId,
        uint256 timestamp
    );

    function execute(address target, bytes calldata data) external payable returns (bytes memory) {
        (bool ok, bytes memory res) = target.call{ value: msg.value }(data);
        bytes32 requestId = keccak256(
            abi.encodePacked(msg.sender, block.timestamp, address(this), res)
        );

        emit SwapExecuted(
            msg.sender,
            target,
            msg.value,
            data,
            res,
            requestId,
            block.timestamp
        );

        require(ok, "execute: call failed");
        return res;
    }
}
