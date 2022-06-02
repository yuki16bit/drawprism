import traceback
import sys

# 自訂的 API 錯誤訊息


def generate_abort_msg(e, custom_msg=''):
  error_class = e.__class__.__name__
  detail = e.args[0]
  cl, exc, tb = sys.exc_info()  # 錯誤完整資訊 Call Stack
  last_callstack = traceback.extract_tb(tb)[-1]  # 最後一行錯誤訊息
  file_name = last_callstack[0]
  line_num = last_callstack[1]
  func_name = last_callstack[2]
  print(f'Exception raise in file: {file_name}, line {line_num}, in {func_name}: [{error_class}] {detail} {custom_msg}')
  msg_for_client = custom_msg if custom_msg != '' else detail
  return f'{msg_for_client}'
