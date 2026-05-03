import logging
import sys

def setup_logger(name: str):
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        formatter = logging.Formatter('[%(name)s] %(message)s')
        handler.setFormatter(formatter)
        logger.addHandler(handler)
    
    return logger

# Global instance
log = setup_logger("LuminaSwarm")
